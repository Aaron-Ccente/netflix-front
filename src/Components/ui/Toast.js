import { toast } from "sonner";
// Éxito
export const showSuccess = (message) => toast.success(message, {
  description: "Se procesó todo correctamente",
  duration: 4000, // duración en ms (por defecto: 4000)
  position: "top-right", // puedes sobrescribir la posición global
  action: {
    label: "Cerrar",
    onClick: () => console.log("Deshacer acción"),
  },
});;

// Errores
export const showError = (message) =>
  toast.error(message);

// Información
export const showInfo = (message) =>
  toast.info(message);

// Advertencia
export const showWarning = (message) =>
  toast.warning(message);

// Carga (con promesa)
export const showLoading = (message) =>
  toast.loading(message);

// Básico / Neutral
export const showMessage = (message) =>
  toast(message);