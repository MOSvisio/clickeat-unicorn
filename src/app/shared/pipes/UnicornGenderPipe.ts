import { Pipe, PipeTransform } from "@angular/core";
import { Unicorn } from "../classes/unicorn";

@Pipe({
    name: "unicornGenderPipe",
    pure: false
})
export class UnicornGenderPipe implements PipeTransform {
    transform(items: Unicorn[], unicorn: Unicorn) {
        if (!items || !unicorn) {
            return items;
        }

        return items.filter(item => item.gender != unicorn.gender && item.id != unicorn.id && item.mate == null && item.gender != 'other');
    }
}