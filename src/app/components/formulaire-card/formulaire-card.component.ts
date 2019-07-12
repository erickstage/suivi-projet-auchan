import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-formulaire-card',
  templateUrl: './formulaire-card.component.html',
  styleUrls: ['./formulaire-card.component.css']
})
export class FormulaireCardComponent implements OnInit {
// Output qui emet le changement sur le formulaire
  @Output() ajoutChangement = new EventEmitter();

  formulaire1  : FormGroup;
  description  : string;
  Ajouter      : any;
  nomProjet    : string;
  messageAlert : string = "Le Nom du projet est nécessaire";

  constructor() {
  //  Creation de la validation du formulaire par la data 
    this.formulaire1 = new FormGroup({

      'nomProjet': new FormControl(null, [
                                            Validators.required,
                                            Validators.minLength(5)],
                                            this.existeProjet
                                  ),
      'date'        : new FormControl(null, Validators.required),
      'equipe'      : new FormControl(null, Validators.required),
      'description' : new FormControl(null,
                                            Validators.compose
                                          ([
                                            Validators.required,
                                            Validators.minLength(3),
                                            Validators.maxLength(200)
                                          ]))
    });

  // observable pour la detection de changement sur le sur l'input nomProjet
  this.formulaire1.controls['nomProjet'].valueChanges
      .subscribe(data => {
      console.log(data);
    });

  // observable pour la detection de changement  de statu sur le sur l'input nomProjet
  this.formulaire1.controls['nomProjet'].statusChanges
      .subscribe(data => {
      console.log(data);
    });
}

  ngOnInit() {
  }

  // bouton ajouter qui ajoute le changement sur les input du formulaire en plus emet les changement au output ajoutChangement
  ajouter(Ajouter) {

    console.log(this.formulaire1.value);
    console.log(this.formulaire1);
    console.log('ici on emet');

    this.description = this.formulaire1.value.description;

    this.ajoutChangement.emit({

      nomProjet   : this.formulaire1.value.nomProjet,
      date        : this.formulaire1.value.date,
      equipe      : this.formulaire1.value.equipe,
      description : this.formulaire1.value.description

    });
  }
// Validation async 
  existeProjet(control: FormControl): Promise<any> | Observable<any> {

    let promise = new Promise(

      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "projet") {

            resolve({ projetExiste: true });
          } else {
            resolve(null)
          }
        }, 3000)
      }
    );
    return promise;
  }


}

