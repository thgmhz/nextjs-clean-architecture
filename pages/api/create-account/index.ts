import { makeApiCreateAccountController } from '@/main/factories/controllers/api-create-account'
import { routeAdapter } from '@/main/adapters/nextjs-route-adapter'

export default routeAdapter(makeApiCreateAccountController())
