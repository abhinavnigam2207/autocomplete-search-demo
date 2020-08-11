export const filterData = (list, q) => {
  return list.filter((item) => {
    const { id, name, items, address, pincode } = item;
    return ~id.toLowerCase().indexOf(q) || 
      ~name.toLowerCase().indexOf(q) || 
      ~address.toLowerCase().indexOf(q) || 
      ~pincode.toLowerCase().indexOf(q) || 
      items.filter((k)=>~k.toLowerCase().indexOf(q)).length
  });
}
