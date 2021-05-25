import isEmpty from 'lodash/isEmpty'; 

export default function validateInput(data){
    let errors = {};
    
    if(isEmpty(data.name.value) ||  isEmpty(data.lastname.value) || isEmpty(data.dateOfBirth.value) ||  isEmpty(data.email.value) || isEmpty(data.password.value) || isEmpty(data.passwordConf.value) || isEmpty(data.phone.value) ||  !(data.cgu.checked) || !data.mail.value.includes("@") ){
        if(isEmpty(data.name.value) && isEmpty(data.lastname.value) && isEmpty(data.dateOfBirth.value) && isEmpty(data.email.value) && isEmpty(data.password.value) && isEmpty(data.passwordConf.value) && isEmpty(data.phone.value) && !(data.cgu.checked) ){
            console.log(data.cgu.checked);
            errors.mail = "Ce champs est obligatoire";
            errors.alertMail='danger';
            errors.password = 'Ce champs est obligatoire';
            errors.alertPass='danger';
            errors.name = "Ce champs est obligatoire";
            errors.alertName='danger';
            errors.lastname = 'Ce champs est obligatoire';
            errors.alertLastname='danger';
            errors.dateOfBirth = "Ce champs est obligatoire";
            errors.AlertDateOfBirth='danger';
            errors.passwordConf = 'Ce champs est obligatoire';
            errors.alertPasswordConf='danger';
            errors.phone = 'Ce champs est obligatoire';
            errors.alertPhone='danger';
            errors.cgu = "Pour valider  l'inscription,vous devez  accepter les conditions d'uitilisateurs";
            errors.alertCgu = 'danger';
        }
        else if(isEmpty(data.name.value)) {
            errors.name = "Ce champs est obligatoire";
            errors.alertName='danger';
        }
        else if(isEmpty(data.lastname.value)) {
            errors.lastname = 'Ce champs est obligatoire';
            errors.alertLastname='danger';
        }
        else if(isEmpty(data.dateOfBirth.value)){
            errors.dateOfBirth = "Ce champs est obligatoire";
            errors.AlertDateOfBirth='danger';
        }
        else if(isEmpty(data.mail.value)) {
            errors.mail = "Ce champs est obligatoire";
            errors.alertMail='danger';
        }
        else if(!data.mail.value.includes("@")){
            errors.mail = "Cet email est invalide";
            errors.alertMail='danger';
        }
        else if(isEmpty(data.password.value)){
         errors.password = 'Ce champs est obligatoire';
         errors.alertPass='danger';
        }
        else if(isEmpty(data.passwordConf.value)){
            errors.password = 'Ce champs est obligatoire';
            errors.alertPass='danger';
        }
        else if(isEmpty(data.password.value)){
            errors.password = 'Ce champs est obligatoire';
            errors.alertPass='danger';
        }
        else if(isEmpty(data.passwordConf.value)){
            errors.passwordConf = 'Ce champs est obligatoire';
            errors.alertPasswordConf='danger';
        }
        else if(data.password.value !=data.passwordConf.value){
            errors.password = 'Les deux mots de pass doivent être identique';
            errors.alertPass='danger';
            errors.passwordConf = 'Les deux mots de pass doivent être identique';
            errors.alertPasswordConf='danger';
        }
        else if(isEmpty(data.phone.value)){
            errors.phone = 'Ce champs est obligatoire';
            errors.alertPhone='danger';
        }
        else if(!phoneNumber(data.phone)){
            errors.phone = "Ce numero de téléphone n'est pas valide";
            errors.alertPhone='danger';
        }
        else if(!(data.cgu.checked)){
            errors.cgu = "Pour valider  l'inscription,vous devez  accepter les conditions d'uitilisateurs";
            errors.alertCgu = 'danger';
        }
        
    }
   
    

    return {
        errors,
        isValid: isEmpty(errors)  
    }; 
}

function phoneNumber(dataNumber){
    let phoneNumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(dataNumber.value.match(phoneNumber)){
        return true;
    }else{
        return false;
    }

}