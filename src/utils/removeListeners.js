export default (socket, listeners) => {
  listeners.forEach((event) => {
    socket.off(event);
  });
};
