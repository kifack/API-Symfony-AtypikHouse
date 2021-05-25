<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PaymentRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(collectionOperations={
 *      "post"={
 *          "controller"=App\Controller\Api\PaymentController::class
 *      },
 *      "get"={
 *      }
 *  
 *  },
 * itemOperations={"get"},
 * normalizationContext={"groups"={"payment:read"}},
 * denormalizationContext={"groups"={"payment:write"}},
 *)
 * @ORM\Entity(repositoryClass=PaymentRepository::class)
 */
class Payment
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @Groups({"payment:read"})
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180)
     * @Groups({"payment:read", "payment:write","read:user_bookings"})
     * @Assert\NotBlank(message="Veuillez renseigner le nom de l'utilisateur")
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=180)
     * @Groups({"payment:read", "payment:write"})
     * @Assert\NotBlank(message="Veuillez renseigner le prénom de l'utilisateur")
     */
    private $lastName;
 
    /**
     * @ORM\Column(type="string", length=200)
     * @Groups({"payment:read", "payment:write"})
     * @Assert\NotBlank(message="Veuillez renseigner l'email de l'utilisateur")
     */
    private $mail;

    /**
     * @ORM\Column(type="text")
     * @Groups({"payment:read", "payment:write"})
     * @Assert\NotBlank(message="Le token du paiment est obligatoire")
     */
    private $tokenStripe;

    /**
     * @ORM\Column(name="created",type="datetime", options={"default":"CURRENT_TIMESTAMP"})
     * @Groups({"payment:read"})
     */
    private $created;

    /**
     * @ORM\OneToOne(targetEntity=Booking::class, inversedBy="payment", cascade={"persist", "remove"})
     * @Groups({"payment:read", "payment:write"})
     * @Assert\NotNull(message="Veuillez renseignez la réservation correspondant a ce paiment")
     */
    private $booking;

    /**
     * @ORM\Column(type="string", length=20)
     * @Groups({"payment:read", "payment:write"})
     * @Assert\NotBlank(message="Veuillez renseignez les 4 derniers chiffre de la carte bancaire")
     */
    private $cardNumber;

    /**
     * @ORM\Column(type="string", length=8)
     * @Groups({"payment:read", "payment:write"})
     * @Assert\NotBlank(message="Veuillez renseignez la date d'expiration de la carte")
     */
    private $expDate;

    /**
     * @ORM\Column(type="string", length=4)
     * @Groups({"payment:read", "payment:write"})
     * @Assert\NotBlank(message="Veuillez renseignez le status du code de la carte")
     * 
     */
    private $cvc;

    /**
     * @ORM\Column(type="float")
     * @Groups({"read:user_bookings","read:owner_bookings"})
     *  @Assert\GreaterThan(
     *     value = 1,
     *     message ="Veuillez renseignez le montant de la reservation"
     * )
     */
    private $montant;

    public function __construct()
    {
        $this->created = new \DateTimeImmutable();

    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(string $mail): self
    {
        $this->mail = $mail;

        return $this;
    }

    public function getTokenStripe(): ?string
    {
        return $this->tokenStripe;
    }

    public function setTokenStripe(string $tokenStripe): self
    {
        $this->tokenStripe = $tokenStripe;

        return $this;
    }

    public function getCreated(): ?\DateTimeInterface
    {
        return $this->created;
    }

    public function setCreated(\DateTimeInterface $created): self
    {
        $this->created = $created;

        return $this;
    }

    public function getBooking(): ?Booking
    {
        return $this->booking;
    }

    public function setBooking(?Booking $booking): self
    {
        $this->booking = $booking;

        return $this;
    }

    public function getCardNumber(): ?string
    {
        return $this->cardNumber;
    }

    public function setCardNumber(string $cardNumber): self
    {
        $this->cardNumber = $cardNumber;

        return $this;
    }

    public function getExpDate(): ?string
    {
        return $this->expDate;
    }

    public function setExpDate(string $expDate): self
    {
        $this->expDate = $expDate;

        return $this;
    }

    public function getCvc(): ?string
    {
        return $this->cvc;
    }

    public function setCvc(string $cvc): self
    {
        $this->cvc = $cvc;

        return $this;
    }

    public function getMontant(): ?float
    {
        return $this->montant;
    }

    public function setMontant(float $montant): self
    {
        $this->montant = $montant;

        return $this;
    }
}
