export class Usuario {
id!: string;
username!: string;
password!: string;
nombres!: string;
apellido!: string;
perfil!: string;
constructor(id:string="", username:string="", password:string="", nombres:string="",
apellido:string="", perfil:string=""){
this.id = id;
this.username = username;
this.password = password;
this.nombres = nombres;
this.apellido = apellido;
this.perfil = perfil;
}
}