<?php

namespace App\Repository;

use App\Entity\Outsider;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Outsider|null find($id, $lockMode = null, $lockVersion = null)
 * @method Outsider|null findOneBy(array $criteria, array $orderBy = null)
 * @method Outsider[]    findAll()
 * @method Outsider[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class OutsiderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Outsider::class);
    }

    // /**
    //  * @return Outsider[] Returns an array of Outsider objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('o.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Outsider
    {
        return $this->createQueryBuilder('o')
            ->andWhere('o.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
