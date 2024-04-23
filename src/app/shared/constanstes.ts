export class Constantes {
    //Base
    public static readonly BASE_URL: string = 'http://localhost:8010/api/v1';

    //Controller
    public static readonly USUARIO: string = '/usuario';
    public static readonly PRODUCTO: string = '/producto';
    public static readonly VENTA: string = '/venta';
    public static readonly PEDIDO: string = '/pedido';
    public static readonly INVENTARIO:string = '/inventario';
    public static readonly LISTAS:string = '/listas';

    //Service
    public static readonly LOGIN: string = '/login';
    public static readonly CONSULTAR: string = '/consultar';
    public static readonly CREAR_VENTA_PRODUCTO: string = '/crear-venta-sin-pedido';
    public static readonly GENERAR_REPORTE: string = '/generar-reporte';
    public static readonly CONSULTAR_SIN_CONFIRMAR: string = '/consultar-sin-confirmar';
    public static readonly CONSULTAR_PEDIDOS_PENDIENTES: string = '/consultar-pedidos-pendientes';
    public static readonly CONSULTAR_PEDIDOS_FACTURACION: string = '/consultar-pedidos-facturacion';
    public static readonly ELIMINAR_PRODUCTO_VENTA: string = '/eliminar-producto-venta';
    public static readonly CREAR_VENTA_CON_PEDIDO: string = '/crear-venta-con-pedido';
    public static readonly ACEPTAR_PEDIDO: string = '/aceptar-pedido';
    public static readonly RECHAZAR_PEDIDO: string = '/rechazar-pedido';
    /*---------*/
    public static readonly CONSULTAR_INVENTARIO: string = '/consultar-inventario';
    public static readonly CONSULTAR_INVENTARIO_NOMBRE: string = '/consultar-inventario-nombre';
    public static readonly CONSULTAR_PRODUCTOS: string = '/consultar-productos';
    public static readonly CONSULTAR_ROLES_USUARIO: string = '/consultar-roles-usuario';
    public static readonly CREAR_USUARIO: string = '/crear';
    public static readonly CONSULTAR_TIPOS_PRODUCTOS: string = '/consultar-tipos-producto';
    public static readonly CREAR_INVENTARIO: string = '/crear';


}