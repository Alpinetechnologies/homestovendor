export default function CalculateGst(amount) {
  const percentage = parseFloat(amount) > 2500 ? 18 : 12;
  const gst = (parseFloat(amount) * percentage) / 100;

  // console.log(gst);

  return gst;
}

// export default function CalculateGst(amount) {
//   const percentage = parseFloat(amount) > 2500 ? 18 : 12;
//   const gst = (parseFloat(amount) * percentage) / 100;

//   const roundedGst = Math.round(gst);

//   return roundedGst;
// }
