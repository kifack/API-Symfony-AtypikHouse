<?php

namespace App\Repository;

use App\Entity\ImageActivity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ImageActivity|null find($id, $lockMode = null, $lockVersion = null)
 * @method ImageActivity|null findOneBy(array $criteria, array $orderBy = null)
 * @method ImageActivity[]    findAll()
 * @method ImageActivity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageActivityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ImageActivity::class);
    }

    // /**
    //  * @return ImageActivity[] Returns an array of ImageActivity objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ImageActivity
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
