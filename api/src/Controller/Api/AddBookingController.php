<?php

namespace App\Controller\Api;

use App\Entity\Location;
use App\Entity\Booking;
use App\Entity\Payment;
use App\Entity\User;

// use App\Repository\CategoryRepository;
// use App\Repository\DestinationRepository;
// use App\Repository\ThematicRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\Validator\ValidatorInterface;
use ApiPlatform\Core\Validator\Exception\ValidationException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;
use Psr\Log\LoggerInterface;


final class AddBookingController extends AbstractController
{
   
    /**
     * @var ValidatorInterface
     */
    private $validator;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;
    private $security;
 


    public function __construct(
        ValidatorInterface $validator,
        EntityManagerInterface $entityManager,
        Security $security
    
    )
    {
        $this->validator = $validator;
        $this->entityManager = $entityManager;
        $this->security=$security;
       
    }

    public function __invoke(Request $request):Booking
    {

        
        $booking = new Booking(); 
        
       $location = $this->getDoctrine()
        ->getRepository(Location::class)
        ->find($request->request->get('location')?:"");


        $booking->setNumberPerson($request->request->get('persons')?:0);
        $booking->setLocation($location);
        $booking->setCustomer($this->security->getUser());

        $startAt = \DateTime::createFromFormat('d-m-Y', $request->request->get('startAt')?:"");
        $endAt = \DateTime::createFromFormat('d-m-Y', $request->request->get('endAt')?:"");
         
        $booking->setDateDebut($startAt);
        $booking->setDateFin($endAt);
        
        $this->validator->validate($booking);

        $this->entityManager->persist($booking);
       

      
        $charge=null;
        //Payment
        try {
            \Stripe\Stripe::setApiKey('sk_test_51Han1IFwzXyd3351W4NxRZNCcOA8EpTIM4IHwswZHBZmynleVPFeNHE13DNyxjrmvrsuQ8UX9AsdPuQlroWF8qAZ00QGwTEBzf');

      
            $charge = \Stripe\Charge::create([
            'amount' => $request->request->get('total')?:0,
            'currency' => 'usd',
            'description' => "Commande de ".$location->getName(),
            'source' => $request->request->get('token')?:"",
            ]);
        } catch (\Throwable $th) {
            throw new BadRequestHttpException('Une erreur lors du paiment');
        }
        $payment = new Payment();
        $payment->setBooking($booking)
                ->setName($request->request->get('name'))
                ->setLastName($request->request->get('lastName'));
        

        $payment->setMail($request->request->get('email')?:"")
                ->setTokenStripe($request->request->get('token')?:"")
                ->setCardNumber($request->request->get('last4')?:"")
                ->setExpDate($request->request->get('expiresAt')?:"")
                ->setCvc("checked")
                ->setMontant($request->request->get('total')?:0);
      
        $this->validator->validate($payment);
        $this->entityManager->persist($payment);
        $this->entityManager->flush();
        return $booking;
    }
}
// https://api-platform.com/docs/core/events/
http://jameshuynh.com/rails/react/upload/2017/09/17/how-to-upload-files-using-react-and-rails-like-a-boss/