<?php
if (!defined('_PS_VERSION_'))
  exit;
 
class psbestprice extends Module
{		
  public function __construct()
  {
    $this->name = 'psbestprice';
    //$this->tab = 'psAllegroTab';
    
    $this->version = 1.0;
    $this->author = 'Paweł Skiba';
    $this->need_instance = 1;
    $this->ps_versions_compliancy = array('min' => '1.6', 'max' =>  _PS_VERSION_);
 
    parent::__construct();
 
    $this->displayName = $this->l('psbestprice');
    $this->description = $this->l('display best price');
  }
  
  
	public function install()
	{
		if (!parent::install()
			//|| !$this->registerHook('actionFrontControllerSetMedia')								    
			|| !$this->registerHook('displayProductPriceBlock')							
			)
			return false;			
		return true;		

	}
	public function uninstall(){
		if (!parent::uninstall())
		return false;
		return true;		
	}
		
//{hook h='displayProductPriceBlock' product=$product type="old_price"}
//{hook h='displayProductPriceBlock' product=$product type="price"}
//{hook h='displayProductPriceBlock' product=$product type="after_price"}
	public function hookDisplayProductPriceBlock($params)
	{
		if ($params['type'] == "after_price") {
			return $this->display(__FILE__, 'views/templates/hook/view.tpl');    
		}
	}


  
 /* 
	protected function createNewToken()
    {
        $this->context->cookie->askForProductToken = md5(uniqid());
        $this->context->cookie->askForProductTokenTTL = time()+600;
        return $this;
    }    
  
	public function hookActionFrontControllerSetMedia($params)
	{		
		if($this->context->controller instanceOf ProductController){			
			$this->createNewToken();
			

			
			if (version_compare(_PS_VERSION_, '1.7.0', '>=') === true){
				$this->context->controller->registerJavascript('modules-psaskforproduct',   _MODULE_DIR_.$this->name.'/js/psaskforproduct.js', ['position' => 'bottom', 'priority' => 150]); 						
			}else{
				
				$this->context->controller->addJqueryUI('ui.core');
				$this->context->controller->addJqueryUI('ui.widget');
				$this->context->controller->addJqueryUI('ui.mouse');
				$this->context->controller->addJqueryUI('ui.slider');	
				$this->context->controller->addJqueryUI('ui.dialog');			
				
				$this->context->controller->addJS(_MODULE_DIR_.$this->name.'/js/psaskforproduct.js' );
			}
		}		
		return;  
	}    
*/  
}
?>
