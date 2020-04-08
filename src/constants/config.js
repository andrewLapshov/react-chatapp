const config = {
  SERVER:
    process.env.NODE_ENV === 'development'
      ? 'localhost:3001'
      : 'https://chatapp--project.herokuapp.com/',
  VIDEO_CONFIG: {
    iceServers: [
      {
        urls: ['stun:stun.l.google.com:19302'],
      },
    ],
  },
};

export default config;
