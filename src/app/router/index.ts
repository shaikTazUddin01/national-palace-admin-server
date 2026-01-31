import { Router } from 'express'
import { authRouter } from '../module/Auth/auth.router'
import { ProductRouter } from '../module/Product/product.router'
import { CategoryRoutes } from '../module/Category/category.router'
import { PurchaseRoutes } from '../module/Purchase/purchase.router'
import { SaleRoutes } from '../module/sells/sale.router'

const router = Router()

const modulesRoutes = [
  {
    path: '/auth',
    pathRoute: authRouter,
  },
  {
    path: '/product',
    pathRoute: ProductRouter,
  },
  {
    path: '/category',
    pathRoute: CategoryRoutes,
  }
  ,
  {
    path: '/purchase',
    pathRoute: PurchaseRoutes,
  }
  ,
  {
    path: '/sales',
    pathRoute: SaleRoutes,
  }
 
  
]

modulesRoutes.forEach(route => router.use(route?.path, route?.pathRoute))

export default router