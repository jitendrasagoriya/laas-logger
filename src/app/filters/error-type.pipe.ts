import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorType'
})
export class ErrorTypePipe implements PipeTransform {

  transform(items: any, ...filters: any[]): any {
    if (!filters){
      return items;
    }
    console.log(filters[0] == "All")
    if(filters[0] == "All") {
      return items;
    }
    if (!Array.isArray(items)){
      return items;
    }
    if (filters && Array.isArray(items)) {
      let filterKeys = Object.keys(filters);
    }

    return items.filter(item => (item.level == filters[0]))
  }
}
