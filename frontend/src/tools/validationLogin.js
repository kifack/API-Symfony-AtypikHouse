import isEmpty from 'lodash/isEmpty'; 

export default function validateInput(data){
    let errors = {};
    
    if(isEmpty(data.mail.value) || isEmpty(data.password.value) || !data.mail.value.includes("@") ){
        if(isEmpty(data.mail.value) && isEmpty(data.password.value)){
            errors.mail = "Ce champs est obligatoire";
            errors.alertMail='danger';
            errors.password = 'Ce champs est obligatoire';
            errors.alertPass='danger';
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
        
    }

    return {
        errors,
        isValid: isEmpty(errors) 
    }; 
}