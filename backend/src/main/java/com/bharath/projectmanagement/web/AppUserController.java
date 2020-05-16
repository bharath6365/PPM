package com.bharath.projectmanagement.web;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bharath.projectmanagement.domain.AppUser;
import com.bharath.projectmanagement.services.AppUserService;
import com.bharath.projectmanagement.services.MapValidationErrorService;

@RestController
@RequestMapping("/api/users")


public class AppUserController {
	
	@Autowired
	private AppUserService appUserService;
	
	@Autowired
	  private MapValidationErrorService errorService;
	
	@PostMapping("/register")
	
	public ResponseEntity<?> registerUser
	      (
			@Valid @RequestBody AppUser newUser, 
		     BindingResult result
		  ){
		
		if (result.hasErrors()) {
			  return errorService.mapValidationService(result);
		}
		
		appUserService.saveUser(newUser);
		
		return new ResponseEntity<AppUser>(newUser, HttpStatus.OK);
		
		
	}

}
