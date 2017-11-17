import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'formattedKey'
})

export class FormattedKeyPipe implements PipeTransform {
    transform(value: string): string {
        return value.replace(",","_");
    }
}