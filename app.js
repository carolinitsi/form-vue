new Vue ({
    el: "#app",
    data: {
        nome: "",
        sobrenome:"",
        email:"",
        cep: "",
        error_cep:"",
        rua: "",
        bairro: "",
        error: " ",
        style_error: false,
        loader: false,
        imagem_loader: "",
        messege: "",
        width: "0",
    },
    watch: {
        cep(cep, antigo) {
            this.error = ""
            this.rua = ""
            this.bairro = ""
            if (cep.length == 8) {
                axios
                    .get("https://viacep.com.br/ws/"+cep+"/json")
                    .then((res) => {
                        setTimeout(() => {
                            this.loader = false
                            this.imagem_loader = ""
                            this.error_cep = ""
                            this.style_error = false
                            this.rua = res.data.logradouro
                            this.bairro = res.data.bairro
                                console.log(res.data)
                        }, "2000");
                        this.imagem_loader = "<img src='Styles/imagens/loader.gif'/>"
                        this.loader = true
                       
                    })
                    .catch((error) => {
                            this.error = "Ops, ouve um erro ao consultar o cep..."
                            console.log(error);
                    });
                
            }
        },
    },
    computed: {
        estilo1() {
            return {
                c1: this.aplicarEstilo,
                c2: !this.aplicarEstilo,
            }
        }
    },
    methods: {
        validaCep() {
            if (this.cep.length < 8) {
                this.style_error = true
                this.error_cep = "*Preencha este campo"
                if ( this.cep > 0 ) {
                    this.error_cep = "*Acho que faltam alguns digitos aqui..."
                }
            }
        },
        validaForm() {
            if (
                this.nome &&
                this.sobrenome &&
                this.email &&
                this.cep &&
                this.rua &&
                this.bairro &&
                ! null &&  
                this.error_cep == false
            ) {
                let valor = 0

                const temporizador = setInterval(() => {
                    valor += 5
                    this.width = `${valor}%`
                    if (valor == 100) {
                        clearInterval(temporizador)
                        this.width = "0"
                        this.messege = "<p  style='color: #a5d6b8'>Formulario enviado com sucesso!</p>"
                    }
                },100)
                this.nome = "",
                this.sobrenome = "",
                this.email = "",
                this.cep = "",
                this.rua = "",
                this.bairro = ""
            } else {
                this.messege = "<p style='color: red'>Preencha todos os campos!</p>"
            }
           

        }
    
    }
})