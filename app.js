let init = false;
const fun = document.getElementById("fun");
fun.addEventListener("click", async () => {
  fun.remove();
  if (init) {
    return;
  }
  init = true;
  try {
    if (
      "DeviceOrientationEvent" in window &&
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const permissionState = await DeviceOrientationEvent.requestPermission();
      if (permissionState === "granted") {
        go();
      } else {
        alert("ok nevermind then");
      }
    } else {
      go();
    }
  } catch (e) {
    console.log(e);
    go();
  }
});

function go() {
  init = true;
  document.body.style.setProperty(
    "--shadow-factor",
    "var(--shadow-factor-animated)"
  );
  let x = 1;
  let y = 1;

  function update() {
    document.body.style.setProperty("--shadow-multiply-x", x);
    document.body.style.setProperty("--shadow-multiply-y", y);
    window.requestAnimationFrame(update);
  }

  update();

  window.addEventListener("mousemove", (event) => {
    x = (event.clientX / window.innerWidth - 0.5) / -0.5;
    y = (event.clientY / window.innerHeight - 0.5) / -0.5;
  });
  window.addEventListener("deviceorientation", (event) => {
    x = Math.min(20, Math.max(-20, event.gamma)) / -20;
    y = (Math.min(70, Math.max(30, event.beta)) - 30 - 20) / -20;
  });
}
