import inside from 'point-in-polygon'

const polygons = [
  {
    price: 10,
    points: [
      [41.904116, -87.620439],
      [41.9403, -87.62003],
      [41.94023, -87.66227],
      [41.903175, -87.677306]
    ]
  },
  {
    price: 12,
    points: [
      [41.88694, -87.66707],
      [41.90333, -87.66747],
      [41.903175, -87.677306],
      [41.94023, -87.66227],
      [41.94029, -87.63851],
      [41.95456, -87.64045],
      [41.95456, -87.64045],
      [41.88665, -87.68657]
    ]
  },
  {
    price: 16,
    points: [
      [41.88665, -87.68657],
      [41.95397, -87.68841],
      [41.95472, -87.64386],
      [41.9696, -87.64484],
      [41.96846, -87.70842],
      [41.88641, -87.70631]
    ]
  },
  {
    price: 20,
    points: [
      [41.88821, -87.7063],
      [41.96846, -87.70842],
      [41.9696, -87.64484],
      [42.01961, -87.6529],
      [42.01903, -87.74771],
      [41.88753, -87.74552]
    ]
  }
]

export default function calcPrice(p) {
  console.log(p.map((i) => parseFloat(i)))
  for (let n = 0; n < polygons.length; n++) {
    if (
      inside(
        p.map((i) => parseFloat(i)),
        polygons[n].points
      )
    )
      return polygons[n].price
  }
}
