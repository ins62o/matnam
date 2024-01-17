import Swal from "sweetalert2";
export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: false,
  padding: "10px",
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

// 토스트 알림 함수 - showToast
export const showToast = (icon, title, ref) => {
  if (ref) ref.current.focus();
  Toast.fire({ icon, title });
};

export const alertSweet = (icon, text, title) => {
  Swal.fire({
    icon,
    text,
    title,
  });
};
