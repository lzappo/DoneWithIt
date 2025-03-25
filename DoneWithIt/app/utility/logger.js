import Bugsnag from "@bugsnag/expo";

const log = (error) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(error);
  }
  Bugsnag.notify(error);
};

const start = () => Bugsnag.start();

export default { log, start };
