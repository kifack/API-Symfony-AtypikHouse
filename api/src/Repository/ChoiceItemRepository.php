<?php

namespace App\Repository;

use App\Entity\ChoiceItem;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method ChoiceItem|null find($id, $lockMode = null, $lockVersion = null)
 * @method ChoiceItem|null findOneBy(array $criteria, array $orderBy = null)
 * @method ChoiceItem[]    findAll()
 * @method ChoiceItem[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ChoiceItemRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ChoiceItem::class);
    }

    // /**
    //  * @return ChoiceItem[] Returns an array of ChoiceItem objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?ChoiceItem
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
