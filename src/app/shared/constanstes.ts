export class Constantes {
    //Base
    public static readonly BASE_URL: string = 'http://localhost:8010/api/v1';

    //Controller
    public static readonly USUARIO: string = '/usuario';
    public static readonly PRODUCTO: string = '/producto';
    public static readonly VENTA: string = '/venta';
    public static readonly PEDIDO: string = '/pedido';

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


}