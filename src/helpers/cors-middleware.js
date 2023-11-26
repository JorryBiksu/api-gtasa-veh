import Cors from 'cors'

export const cors = Cors({
  methods: ['POST', 'GET', 'HEAD', 'PUT', 'DELETE'],
})

export function runMiddleware(
  req,
  res,
  fn
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
