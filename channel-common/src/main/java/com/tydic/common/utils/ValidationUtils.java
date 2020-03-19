package com.tydic.common.utils;

import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;

import org.hibernate.validator.HibernateValidator;

import com.tydic.common.exception.ParameterException;

/**
 * 参数校验
 * @author HLF
 *
 */
public class ValidationUtils {

	private static Validator validator = Validation.byProvider(HibernateValidator.class).configure().
    		failFast(true).buildValidatorFactory().getValidator();

    public static <T> void validate(T obj) {
        Set<ConstraintViolation<T>> constraintViolations = validator.validate(obj);
        if (constraintViolations.size() > 0) {
        	ConstraintViolation<T> cv=constraintViolations.iterator().next();
        	throw new ParameterException(cv.getMessage(),cv.getRootBeanClass().getName(),cv.getPropertyPath().iterator().next().getName());
        }
    }
}
