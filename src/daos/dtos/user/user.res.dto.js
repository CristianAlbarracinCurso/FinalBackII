export default class userResponseDTO {
    constructor(user) {
      this.id = user._id; // Mapea el ID de MongoDB
      this.first_name = user.first_name; // Nombre del usuario
      this.last_name = user.last_name; // Apellido del usuario
      this.email = user.email; // Correo electrónico
      this.age = user.age; // Edad del usuario
      this.role = user.role; // Rol del usuario
      this.image = user.image; // Imagen asociada al usuario
    }
  }
  