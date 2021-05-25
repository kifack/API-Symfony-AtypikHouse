<?php

  namespace App\Controller\Api;
  use App\Entity\Payment;
  use App\Manager\PaymentManager;

    

  class PaymentController{

    private $paymentManager;

    public function __construct(PaymentManager $paymentManager){

      $this->paymentManager = $paymentManager;

    }

    public function __invoke(Payment $data){

      return $this->paymentManager->pay($data);


    }
      
  } 

  // Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/account/apikeys
// \Stripe\Stripe::setApiKey('pk_test_51Han1IFwzXyd3351l4QT3b6wuJWxr6MNJTlIvu8qvzRotLpyYMOCPoICDDOBXWtc1DYowA1cozHTqdXe0DdouWJu00LCu1hzbU');

// // Token is created using Stripe Checkout or Elements!
// // Get the payment token ID submitted by the form:
// $token = $_POST['stripeToken'];
// $charge = \Stripe\Charge::create([
//   'amount' => 999,
//   'currency' => 'usd',
//   'description' => 'Example charge',
//   'source' => $token,
// ]);

?>