import { Injectable } from '@angular/core';
import { Food } from '../model/food';

declare var window;

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  breakfast: Food[] = [];
  lunch: Food[] = [];
  dinner: Food[] = [];
  foodCounter: number = 6;

  constructor(
  ) {
    this.breakfast = [
      {
        id: 0,
        name: "Plátano",
        grml: 140,
        kcal: 105,
        protein: 1.29,
        carbs: 27,
        fats: 0.39
      },
      {
        id: 1,
        name: "Vaso de leche",
        grml: 250,
        kcal: 146,
        protein: 7.86,
        carbs: 11,
        fats: 7.93
      }
    ];

    this.lunch = [
      {
        id: 2,
        name: "Arroz basmati",
        grml: 100,
        kcal: 344,
        protein: 7.6,
        carbs: 75,
        fats: 1
      },
      {
        id: 3,
        name: "Atún",
        grml: 160,
        kcal: 155,
        protein: 33.6,
        carbs: 1.6,
        fats: 1.6
      }
    ];

    this.dinner = [
      {
        id: 4,
        name: "Pasta-Lazos",
        grml: 100,
        kcal: 358,
        protein: 12,
        carbs: 72,
        fats: 1.5
      },
      {
        id: 5,
        name: "Aceite de Oliva",
        grml: 10,
        kcal: 90,
        protein: 0,
        carbs: 0,
        fats: 10
      }
    ];
  }

  public getSingleFood(id: number): Food {
    if (this.breakfast.find(f => f.id === id)) {
      return this.breakfast.filter(f => f.id === id)[0];
    } else if (this.lunch.find(f => f.id === id)) {
      return this.lunch.filter(f => f.id === id)[0];
    } else {
      return this.dinner.filter(f => f.id === id)[0];
    }
  }

  public getTypeOfFood(id: number): string {
    if (this.breakfast.find(f => f.id === id)) {
      return "breakfast";
    } else if (this.lunch.find(f => f.id === id)) {
      return "lunch";
    } else {
      return "dinner";
    }
  }

  public getBreakfast(): Food[] {
    return this.breakfast;
  }

  public getLunch(): Food[] {
    return this.lunch;
  }

  public getDinner(): Food[] {
    return this.dinner;
  }

  public saveFood(f: Food, typeOfFood: string) {
    if (f.id == undefined) { // Comida nueva
      f.id = this.foodCounter++;
      if (typeOfFood == "breakfast") {
        this.breakfast.push(f);
      } else if (typeOfFood == "lunch") {
        this.lunch.push(f);
      } else {
        this.dinner.push(f);
      }
    } else { // Edición de una comida
      window.home.deleteFood(f.id); // Para llamar al metodo deleteFood del HomePage
      if (typeOfFood == "breakfast") {
        this.breakfast.push(f);
      } else if (typeOfFood == "lunch") {
        this.lunch.push(f);
      } else {
        this.dinner.push(f);
      }
    }
    window.home.updateMacros();
  }

  public deleteFood(id: number) {
    if (this.breakfast.find(f => f.id === id)) {
      this.breakfast = this.breakfast.filter(f => f.id != id);
    } else if (this.lunch.find(f => f.id === id)) {
      this.lunch = this.lunch.filter(f => f.id != id);
    } else {
      this.dinner = this.dinner.filter(f => f.id != id);
    }
  }
}
