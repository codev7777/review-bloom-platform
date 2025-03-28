const GetDomain = () => {
  const isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  const url = isLocal
    ? "http://" + window.location.hostname + ":" + window.location.port
    : "https://" + window.location.hostname;

  return url;
};

export default GetDomain;
