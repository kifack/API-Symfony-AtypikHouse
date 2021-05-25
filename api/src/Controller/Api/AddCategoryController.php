<?php

namespace App\Controller\Api;

use App\Entity\Category;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Validator\ValidatorInterface;

final class AddCategoryController
{
   
    private $security;
    private $validator;

    public function __construct(ValidatorInterface $validator, Security $security)
    {

        $this->security=$security;
        $this->validator = $validator;
    }
    public function __invoke(Request $request): Category
    {
        $uploadedFile = $request->files->get('file');
        // if (!$uploadedFile) {
        //     throw new BadRequestHttpException('"file" is required');
        // }

        $category = new Category();
        $category->setDescription($request->request->get('description') ?: "");
        $category->setName($request->request->get('name') ?: "");
        $category->setImageFile($uploadedFile);
        $category->setAuthor($this->security->getUser());
         
        $this->validator->validate($category);
        return $category;
    }
}