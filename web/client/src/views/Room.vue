<template>
  <div id="videoContainer" ref="videoContainer"></div>
</template>

<script>
import Peer from 'peerjs'

export default {
  name: 'Home',
  data() {
    return {
      peer: null,
      peer_list: {},
      stream: null
    }
  },
  methods: {
    connectPeer(peer_id, stream) {
      const call = this.peer.call(peer_id, stream)
      const call_in_video = document.createElement('video')
      call.on('stream', (stream) => {
        call_in_video.srcObject = stream
        call_in_video.onloadedmetadata = () => {
          call_in_video.play()
        }
        this.$refs.videoContainer.appendChild(call_in_video)
      })
      call.on('close', () => {
        call_in_video.remove()
      })

      this.peer_list[peer_id] = call
    }
  },
  mounted() {
    // Video Setting
    const my_video = document.createElement('video')
    my_video.muted = true // Avoid echo from ourselves
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      my_video.srcObject = stream
      my_video.onloadedmetadata = () => {
        my_video.play()
      }
      this.$refs.videoContainer.appendChild(my_video)

      // Create a Peer instance and emit join room signal after that
      const room_id = this.$route.params.room_id
      this.peer = new Peer(undefined, { host: 'localhost', port: 3000, path: 'peerjs/rtc' })
      this.peer.on('open', (peer_id) => {
        this.$socket.emit('join_room', room_id, peer_id)
      })
      this.peer.on('call', (call) => {
        call.answer(stream)
        const call_in_video = document.createElement('video')
        call.on('stream', (stream) => {
          call_in_video.srcObject = stream
          call_in_video.onloadedmetadata = () => {
            call_in_video.play()
          }
          this.$refs.videoContainer.appendChild(call_in_video)
        })
      })

      // Streaming our audio data to the new connector
      this.$socket.on('peer_connected', (peer_id) => {
        this.connectPeer(peer_id, stream)
      })

      this.$socket.on('peer_disconnected', (peer_id) => {
        if (this.peer_list[peer_id]) this.peer_list[peer_id].close()
      })
    })
  }
}
</script>

<style scoped>
#videoContainer {
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-auto-rows: 300px;
}
</style>

<style>
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>