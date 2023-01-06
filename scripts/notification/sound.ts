export function prepareSound() {
  const notifysound = document.getElementById(
    "notifysound"
  ) as HTMLAudioElement;
  // notifysound.volume = 0.001;
  notifysound.play();
  notifysound.pause();
}

export function playSound() {
  const notifysound = document.getElementById(
    "notifysound"
  ) as HTMLAudioElement;
  notifysound.currentTime = 0;
  // notifysound.volume = 1;
  notifysound.play();
}
