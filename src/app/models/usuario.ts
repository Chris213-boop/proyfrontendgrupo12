export class Usuario {
username!: string;
password!: string;
nombres!: string;
apellido!: string;
perfil!: string;
constructor(username:string="", password:string="", nombres:string="",
apellido:string="", perfil:string=""){
this.username = username;
this.password = password;
this.nombres = nombres;
this.apellido = apellido;
this.perfil = perfil;
}
}