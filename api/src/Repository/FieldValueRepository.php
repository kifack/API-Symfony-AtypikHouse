<?php

namespace App\Repository;

use App\Entity\FieldValue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method FieldValue|null find($id, $lockMode = null, $lockVersion = null)
 * @method FieldValue|null findOneBy(array $criteria, array $orderBy = null)
 * @method FieldValue[]    findAll()
 * @method FieldValue[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class FieldValueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, FieldValue::class);
    }

    // /**
    //  * @return FieldValue[] Returns an array of FieldValue objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('f.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?FieldValue
    {
        return $this->createQueryBuilder('f')
            ->andWhere('f.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
