import isEmpty from 'lodash/isEmpty'; 

export default function validateInput(data){
    let errors = {};
    
    if(isEmpty(data.denomination.value) ||  isEmpty(data.numberSiret.value) || isEmpty(data.street.value) ||  isEmpty(data.otherInformationAddresse.value) || isEmpty(data.city.value) || isEmpty(data.zipCode.value) || isEmpty(data.cuntry.value) || isEmpty(data.codeNaf.value) ||  isEmpty(data.formLegal.value)){
        if(isEmpty(data.denomination.value) &&  isEmpty(data.numberSiret.value) && isEmpty(data.street.value) &&  isEmpty(data.otherInformationAddresse.value) && isEmpty(data.city.value) && isEmpty(data.zipCode.value) && isEmpty(data.cuntry.value) && isEmpty(data.codeNaf.value) &&  isEmpty(data.formLegal.value)){
           
            errors.denomination = "Ce champs est obligatoire";
            errors.alertDenomination='danger';
            errors.numberSiret = 'Ce champs est obligatoire';
            errors.alertNumberSiret='danger';
            errors.street = "Ce champs est obligatoire";
            errors.alertStreet='danger';
            errors.otherInformationAddresse = 'Ce champs est obligatoire';
            errors.alertOtherInformationAddresse='danger';
            errors.city = "Ce champs est obligatoire";
            errors.alertCity='danger';
            errors.zipCode = 'Ce champs est obligatoire';
            errors.alertZipCode='danger';
            errors.cuntry = 'Ce champs est obligatoire';
            errors.alertCuntry='danger';
            errors.formLegal = "Ce champs est obligatoire";
            errors.alertFormLegal = 'danger';
            errors.codeNaf = "Ce champs est obligatoire";
            errors.alertCodeNaf = 'danger';
        }
        else if(isEmpty(data.denomination.value)) {
            errors.denomination = "Ce champs est obligatoire";
            errors.alertDenomination='danger';
        }
        else if(isEmpty(data.numberSiret.value)) {
            errors.numberSiret = 'Ce champs est obligatoire';
            errors.alertNumberSiret='danger';
        }
        else if(isEmpty(data.street.value)){
            errors.street = "Ce champs est obligatoire";
            errors.alertStreet='danger';
        }
        else if(isEmpty(data.otherInformationAddresse.value)) {
            errors.otherInformationAddresse = 'Ce champs est obligatoire';
            errors.alertOtherInformationAddresse='danger';
        }
        else if(isEmpty(data.city.value)) {
            errors.city = "Ce champs est obligatoire";
            errors.alertCity='danger';
        }
        else if(isEmpty(data.zipCode.value)){
            errors.zipCode = 'Ce champs est obligatoire';
            errors.alertZipCode='danger';
        }
        else if(isEmpty(data.cuntry.value)){
            errors.cuntry = 'Ce champs est obligatoire';
            errors.alertCuntry='danger';
        }
        else if(isEmpty(data.formLegal.value)){
            errors.formLegal = "Ce champs est obligatoire";
            errors.alertFormLegal = 'danger';
        }
        else if(isEmpty(data.codeNaf.value)){
            errors.codeNaf = "Ce champs est obligatoire";
            errors.alertCodeNaf = 'danger';
        }
        
        
    }
   
    return {
        errors,
        isValid: isEmpty(errors)  
    }; 
}

