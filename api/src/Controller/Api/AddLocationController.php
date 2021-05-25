<?php

namespace App\Controller\Api;

use App\Entity\Location;
use App\Entity\Destination;
use App\Entity\Thematic;
use App\Entity\Image;
use App\Entity\Category;
use App\Entity\User;
use App\Entity\Field;
use App\Entity\FieldValue;
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


final class AddLocationController extends AbstractController
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

    public function __invoke(Request $request):Location
    {
        
        
        $location = new Location($request->request->get('travelers')?:0);
        $location->setName($request->request->get('name')?:"")
                 ->setDescription($request->request->get('description')?:"")
                 ->setStreet($request->request->get('street')?:"")
                 ->setPostalCode($request->request->get('postal_code')?:"")
                 ->setCity($request->request->get('city')?:"")
                 ->setPrice($request->request->get('price')?:0)
                 ->setRooms($request->request->get('rooms')?:0)
                 ->setSurface($request->request->get('surface')?:0);
              

        $category = $this->getDoctrine()
        ->getRepository(Category::class)
        ->find($request->request->get('category')?:"");

        $thematics=json_decode($request->request->get('thematics'))?:[];

        foreach ($thematics as $id) {
            $thematic = $this->getDoctrine()
            ->getRepository(Thematic::class)
            ->find($id);
            $location->addThematic($thematic);
        }

     
        
        $destination = $this->getDoctrine()
        ->getRepository(Destination::class)
        ->find($request->request->get('destination')?:"");

        $location->setCategory($category);
        $location->setDestination($destination);
        $location->setUser($this->security->getUser());

       

       //Get all params
        $fields=json_decode($request->request->get('fields'),true)?:[];

        for ($i=0; $i <count($fields) ; $i++) { 
            
            $field= $this->getDoctrine()
            ->getRepository(Field::class)
            ->find( $fields[$i]["fieldId"]);

            $fieldValue= new FieldValue();

            $fieldValue->setFieldValue($fields[$i]["value"]);
            $fieldValue->setField($field);
            $fieldValue->setLocation($location);
            $this->entityManager->persist($fieldValue);
        }

       

        $files = $request->files->all();
        // $images=[];
        foreach ($files as $file) {
            $image = new Image();
            $image->setImageFile($file);
            $image->setDescription("Description");

            
            $this->validator->validate($image);
            $location->addImage($image);
           
            $this->entityManager->persist($image);
                

        }

        $this->validator->validate($location);

        $this->entityManager->persist($location);
        $this->entityManager->flush();
        return $location;
    }
}

http://jameshuynh.com/rails/react/upload/2017/09/17/how-to-upload-files-using-react-and-rails-like-a-boss/