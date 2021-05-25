<?php

  namespace App\Manager;

  use Stripe\Stripe;
  use Stripe\PaymentIntent;
  use Stripe\Customer;
  use App\Entity\Payment;

  class PaymentManager{

      private $stripe;
      private $paymentintent;
      private $customer;

      public function __construct(Stripe $tripe, PaymentIntent $paymentIntent, Customer $customer)
      {
          $this->stripe = $tripe;
          $this->paymentIntent = $paymentIntent;
          $this->customer = $customer;
      }

    
      public function pay(Payment $payment)
      {
        $this->stripe::setApiKey('sk_test_51HNEC3HrhuA6dM3oI8eiRjkoM4dRQ6YCfAcg1h4sfwUnO5Pmhmq7gfngEJfpq5ybTTW0azEsfPQY5i320NoTKCyA00jZK2lAwk');

        $json_obj=["cardnumber"=>$payment->getCardNumber(),
                  "exp-date"=>$payment->getExpDate(), "cvc"=>$payment->getCvc(),
                  "montant" => $payment->getMontant()];

        $customer = $this->customer::create(array(
          "email" => $payment->getMail(),
          "source" => $payment->getTokenStripe() 
        
        ));

        $payment = $this->paymentIntent::create([
          'amount' => $this->calculateOrderAmount($json_obj),
          'currency' => 'eur',
          'customer' => $customer->id
        ]);

        $output = [ 'clientSecret' => $payment->client_secret ];
      }

      public function calculateOrderAmount(Array $items): int {
          
        return $items->montant;
      }
      
  } 

?>