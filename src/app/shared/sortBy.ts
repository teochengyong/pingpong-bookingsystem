export class SortBy {
  orderByDate(value: any, args?: any) {
    if (!value) { return null;}
    let newVal = value.sort((a: any, b: any) => {
      let date1 = new Date(a.date);
      let date2 = new Date(b.date);

      if (date1 > date2) {
        return 1;
      } else if (date1 < date2) {
        return -1;
      } else {
        return 0;
      }
    });

    return newVal;
  }
}
