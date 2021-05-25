<?php

namespace App\Controller\Api;

use App\Entity\Location;
use App\Entity\ImageActivity;
use App\Entity\User;
use App\Entity\Activity;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use ApiPlatform\Core\Validator\ValidatorInterface;
use ApiPlatform\Core\Validator\Exception\ValidationException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;

final class AddActivityController extends AbstractController
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

    public function __invoke(Request $request):Activity
    {
       
        $activity = new Activity();
        $activity->setDescription($request->request->get('description') ?: "")
                 ->setDistance($request->request->get('distance') ?: 0)
                 ->setPrice($request->request->get('price') ?: 0);
       
        
        $location = $this->getDoctrine()
        ->getRepository(Location::class)
        ->find($request->request->get('location') ?: "");

        

        $activity->setLocation($location);
        $activity->setUser($this->security->getUser());
       
       

        $files = $request->files->all();
        // $images=[];
        foreach ($files as $file) {
            $image = new ImageActivity();
            $image->setImageFile($file);
            $image->setDescription("Description");
            $image->setActivity($activity);

            $this->validator->validate($image);
            $this->entityManager->persist($image);
            $activity->addImage($image);
        }
        $this->validator->validate($activity);
        $this->entityManager->persist($activity);
       
       

        $this->entityManager->flush();
        return $activity;
    }
}

http://jameshuynh.com/rails/react/upload/2017/09/17/how-to-upload-files-using-react-and-rails-like-a-boss/