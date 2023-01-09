export function prepareSound() {
  const notifysound = document.getElementById(
    "notifysound"
  ) as HTMLAudioElement;
  if (!notifysound) {
    console.log("No Notifysound");
    return;
  }
  notifysound.volume = 0.001;
  notifysound.play();
  notifysound.pause();
}

export function playSound() {
  const notifysound = document.getElementById(
    "notifysound"
  ) as HTMLAudioElement;
  if (!notifysound) {
    console.log("No Notifysound");
    return;
  }
  notifysound.currentTime = 0;
  notifysound.volume = 1;
  notifysound.play();
}
