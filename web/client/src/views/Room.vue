<template>
  <div></div>
</template>

<script>
import Peer from 'peerjs'

export default {
  name: 'Home',
  mounted() {
    const peer = new Peer(undefined, { host: 'localhost', port: 3000, path: 'peerjs/rtc' })
    const room_id = this.$route.params.room_id
    peer.on('open', (peer_id) => {
      this.$socket.emit('join_room', room_id, peer_id)
    })
  }
}
</script>
