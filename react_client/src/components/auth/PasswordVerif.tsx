import React from 'react';

interface validationRules {
    regex?: RegExp,
    conditionVerif?: (value: string) => boolean,
    message: string
}

export const passwordVerif = (
    passwordChange: React.RefObject<HTMLInputElement>,
    validationRules: validationRules[],
    setValidationResult: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>

) => {
    if (passwordChange.current) {
        const password: string = passwordChange.current.value;

        const newValidationRules: { [key: number]: boolean } = {}

        validationRules.forEach((rule,index) => {
            if(rule.regex){
                newValidationRules[index] = password.match(rule.regex) !== null
            }
            else if (rule.conditionVerif){
                newValidationRules[index] = rule.conditionVerif(password)
            }
        })
        
        setValidationResult(newValidationRules)
    }
}