<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\BookingRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ApiResource(collectionOperations={
 * "add_booking"={
 * "method"="POST",
 *  "controller"=App\Controller\Api\AddBookingController::class,
 *  "security"="is_granted('ROLE_USER')",
 * "defaults"={"_api_receive"=false},
 * },
 * "read_user_bookings"={
 *      "method"="GET",
 *      "security"="is_granted('ROLE_USER')",
 *      "normalization_context"={"groups"={"read:user_bookings"}}
 * },
 *  * "read_owner_bookings"={
 *      "method"="GET",
 *      "path"="/owner/bookings",
 *      "security"="is_granted('ROLE_USER')",
 *      "normalization_context"={"groups"={"read:owner_bookings"}}
 * },
 *  "read_booking_slots"={
 *     "path"="/All/slots",
 *      "method"="GET",
 *      "normalization_context"={"groups"={"read:booking_slots"}}
 * },
 * "get"
 * },
 * itemOperations={"get","patch","delete"}
 * )
 * @ApiFilter(SearchFilter::class, properties={"customer": "exact","location": "exact"})
 * @ORM\Entity(repositoryClass=BookingRepository::class)
 */
class Booking
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"booking:read","read:user_bookings","read:owner_bookings"})
     * 
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Location::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"booking:read", "booking:write","read:user_bookings"})
     * @Assert\NotNull(message="Veuillez renseignez l'hebergement pour votre reservation")
     */
    private $location;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="bookings")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"booking:read", "booking:write","read:owner_bookings"})
     * @Assert\NotNull(message="Veuillez renseignez l'utilisateur")
     */
    private $customer;

    /**
     * @ORM\Column(type="date")
     * @Groups({"booking:read", "booking:write","read:user_bookings","read:booking_slots","read:owner_bookings"})
     * @Assert\NotNull(message="Veuillez renseignez la date de debut de la reservation")
     */
    private $dateDebut;

    /**
     * @ORM\Column(type="date")
     * @Groups({"booking:read", "booking:write","read:user_bookings","read:booking_slots","read:owner_bookings"})
     * @Assert\NotNull(message="Veuillez renseignez la date de fin de la reservation")
     */
    private $dateFin;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"booking:read", "booking:write","read:owner_bookings"})
     * @Assert\GreaterThan(
     *     value = 0,
     *     message ="Vous devez renseigner le nombre de voyageurs"
     * )
     */
    private $numberPerson;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"booking:read", "booking:write","read:user_bookings","read:owner_bookings"})
     */
    private $dateCreated;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"booking:read", "booking:write"})
     */
    private $dateModified;

    /**
     * @ORM\OneToOne(targetEntity=Payment::class, mappedBy="booking", cascade={"persist", "remove"})
     *  @Groups({"read:user_bookings","read:owner_bookings"})
     */
    private $payment;

    /**
     * @ORM\Column(type="smallint", nullable=true)
     * @Groups({"read:user_bookings","read:owner_bookings"})
     */
    private $status;

    public function __construct()
    {
        $this->dateCreated = new \DateTimeImmutable();
        $this->dateModified = $this->dateCreated;  
        $this->status =0;

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(?Location $location): self
    {
        $this->location = $location;

        return $this;
    }

    public function getCustomer(): ?User
    {
        return $this->customer;
    }

    public function setCustomer(?User $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->dateFin;
    }

    public function setDateFin(\DateTimeInterface $dateFin): self
    {
        $this->dateFin = $dateFin;

        return $this;
    }

    public function getNumberPerson(): ?int
    {
        return $this->numberPerson;
    }

    public function setNumberPerson(int $numberPerson): self
    {
        $this->numberPerson = $numberPerson;

        return $this;
    }

    public function getDateCreated(): ?\DateTimeInterface
    {
        return $this->dateCreated;
    }

    public function setDateCreated(\DateTimeInterface $dateCreated): self
    {
        $this->dateCreated = $dateCreated;

        return $this;
    }

    public function getDateModified(): ?\DateTimeInterface
    {
        return $this->dateModified;
    }

    public function setDateModified(?\DateTimeInterface $dateModified): self
    {
        $this->dateModified = $dateModified;

        return $this;
    }

    public function getPayment(): ?Payment
    {
        return $this->payment;
    }

    public function setPayment(?Payment $payment): self
    {
        $this->payment = $payment;

        // set (or unset) the owning side of the relation if necessary
        $newBooking = null === $payment ? null : $this;
        if ($payment->getBooking() !== $newBooking) {
            $payment->setBooking($newBooking);
        }

        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(?int $status): self
    {
        $this->status = $status;

        return $this;
    }
}
