import React from "react";
import { useFlutterwave, closePaymentModal} from "flutterwave-react-v3";
import Header from "./Header";

export default function PaymentPage() {
    const config = {
        public_key: 'FLWPUBK_TEST-f8180e48d2352e0e27d378926d683d3c-X',
        tx_ref: Date.now(),
        amount: 100,
        currency: 'NGN',
        payment_options:"card",
        customer: {
            email: "emmanuelkaluck@gmail.com",
            phonenumber: "08045678901",
            name: "Emmanuel Kalu",
        },
        customizations: {
            title: 'Emmancipated test',
            description: 'Payment for item in cart',
            logo: 'linktoimage'
        }
    }

    const handleFlutterPayment = useFlutterwave(config);

    return (
        <div className="payment-page" >
           <Header/>
            <h1>Hello Test User</h1>

            <button
                onClick={() => {
                    handleFlutterPayment({
                        callback: (response) => {
                            setTimeout(() => {
                                console.log(response);
                                closePaymentModal(); 
                            }, 5000);
                            
                        },
                        onClose: (repo) => {
                            console.log("Just closed now");
                            console.log(repo);
                        }
                    });
                }}
            >
                Test payment
            </button>
            <p>Click to make a test payment.</p>
        </div>
    );
}

