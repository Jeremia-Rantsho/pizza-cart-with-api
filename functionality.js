

function functionality() {
    return {
        pizzaAmount: 0,
        paymentMsg: '',
        paymentAmount: 0.00,
        totalChange: 0,
        showHistory: false,
        username: '',
        myCartId: '',
        myPizzas: [],
        pizzasCart: [],
        featuredpizzas: [],
        pizzasCartTotal: 0.00,
        change: 0.00,

        getCart() {
            const myCartUrl = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.myCartId}/get`
            return axios.get(myCartUrl);
        },

        init() {
            axios
                .get('https://pizza-api.projectcodex.net/api/pizzas')
                .then(result => {
                    this.myPizzas = result.data.pizzas
                })
                .then(() => {
                    return this.featuredPizzas();
                })

                this.featuredPizzas();
            this.showPizzacart();
            // if (!this.myCartId) {
            //     this.createPizzacart().then(() => {
            //         this.showPizzacart();
            //     });

            // }
            const storedUsername = localStorage['username']
            if (storedUsername) {
                this.username = storedUsername;
            }
        },
        showPizzacart() {
            this.getCart().then(result => {
                const cartData = result.data;
                this.pizzasCart = cartData.pizzas;
                this.pizzasCartTotal = cartData.total;
            })
        },
        createPizzacart() {
            if (!this.username) {
                return Promise.resolve();
            }
            const createCarturl = `https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.username}`
            const cartId = localStorage['cartId']

            if (cartId) {
                this.myCartId = cartId;
                return Promise.resolve();
            } else {
                return axios.get(createCarturl).then(result => {
                    this.myCartId = result.data.cart_code;
                    localStorage['cartId'] = this.myCartId;
                });
            }


        },
        addPizza(pizzaId) {
            return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/add', {
                "cart_code": this.myCartId,
                "pizza_id": pizzaId
            });
        },
        addPizzaFunc(pizzaId) {
            this.addPizza(pizzaId).then(this.showPizzacart())
            .then(() => {
                return this.featuredPizzas();
            })
            .then(() => {
                return this.postfeaturedPizzas();
            })
        },
        removePizza(pizzaId) {
            return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/remove', {
                "cart_code": this.myCartId,
                "pizza_id": pizzaId
            });
        },
        removePizzaFunc(pizzaId) {
            this.removePizza(pizzaId).then(this.showPizzacart())
        },
        makePayment(amount) {
            return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/pay', {
                "cart_code": this.myCartId,
                "amount": amount
            });

        },
        purchasePizza() {
            this.makePayment(this.paymentAmount).then(result => {
                if (result.data.status == 'failure') {
                    this.paymentMsg = result.data.message;
                    setTimeout(() => this.paymentMsg = '', 5000);
                } else {
                    this.paymentMsg = 'Payment successful. Enjoy your pizza :)';
                    setTimeout(() => {
                        this.paymentMsg = '';
                        this.pizzasCart = [];
                        this.pizzasCartTotal = 0.00;
                        this.myCartId = '';
                        this.paymentAmount = 0;
                        localStorage['cartId'] = '';
                        this.createPizzacart();
                    }, 5000);
                }
            })
        },
        myLogin() {
            if (this.username.length > 5) {
                localStorage['username'] = this.username;
                this.createPizzacart();
            } else {
                alert('Username is too short')
            }
        },
        myLogout() {
            if (confirm("You are about to leave the page. Do you want to exit?")) {
                this.username = '';
                this.myCartId = '';
                localStorage['cartId'] = '';
                localStorage['username'] = '';
            }
        }
        // featuredPizzas() {
        //     axios.get(`https://pizza-api.projectcodex.net/api/pizzas/featured?username=${this.username}`)
        //         .then(result => {
        //             this.featuredPizzas = result.data.pizzas
        //         }
        //         )
        // },
        // postfeaturedPizzas() {
        //     axios.post('https://pizza-api.projectcodex.net/api/pizzas/featured', {
        //         username: this.username,
        //         pizza_id: pizzaId
        //     }).then(() => this.featuredPizzas());
        // },
        // activateDisplayHistory() {
        //     this.displayHistory = true;
        //     this.cartDisplayed = true;
        // },
        // newOrder() {
        //     this.displayHistory = false;
        //     this.cartDisplayed = false;
        // },
        // orderHistory() {

        //     const orderHistoryUrrl = `https://pizza-api.projectcodex.net/api/pizza-cart/username/${this.username}`
        //     axios.get(orderHistoryUrrl).then(
        //         result => {

        //             this.historyCartsIds = result.data.filter(cart => cart.status === 'paid');
        //             this.activateDisplayHistory();
        //         }
        //     )

        // },

        // getPastOrders(CartCode) {

        //     const getCartUrl = `https://pizza-api.projectcodex.net/api/pizza-cart/${CartCode}/get`;
        //     return axios.get(getCartUrl)
        //         .then(result => {

        //             this.pastOrderedPizzas.push({ 'pizzas': result.data.pizzas, 'total': result.data.total, 'cartId': result.data.id });

        //         })


        // },
        // historyPizzas() {
        //     this.orderHistory();
        //     this.orderHistory();
        // }



    }
};