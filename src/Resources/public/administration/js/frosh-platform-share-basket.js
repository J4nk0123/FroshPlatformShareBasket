(this.webpackJsonp=this.webpackJsonp||[]).push([["frosh-platform-share-basket"],{ETdz:function(e,t,s){},J7SC:function(e,t){e.exports='{% block frosh_share_basket_list %}\n    <sw-page class="frosh-share-basket-list">\n\n        {% block frosh_share_basket_list_content %}\n            <template slot="content">\n\n                {% block frosh_share_basket_list_grid %}\n                    <sw-data-grid\n                        v-if="items"\n                        :dataSource="items"\n                        :showSelection="false"\n                        :showActions="false"\n                        :sortBy="sortBy"\n                        :sortDirection="sortDirection"\n                        :columns="columns"\n                        @column-sort="onSortColumn">\n\n                        {% block frosh_share_basket_list_grid_columns %}\n                            {% block frosh_share_basket_list_grid_columns_save_count %}\n                                <template #column-saveCount="{ item }">\n                                    {% block frosh_share_basket_list_grid_columns_save_count_content %}\n                                        <template>\n                                            {{ item.saveCount }} x\n                                        </template>\n                                    {% endblock %}\n                                </template>\n                            {% endblock %}\n                        {% endblock %}\n\n                        <template slot="pagination">\n                            {% block frosh_share_basket_list_grid_pagination %}\n                                <sw-pagination :page="page"\n                                               :limit="limit"\n                                               :total="total"\n                                               :total-visible="7"\n                                               @page-change="onPageChange">\n                                </sw-pagination>\n                            {% endblock %}\n                        </template>\n                    </sw-data-grid>\n                {% endblock %}\n\n                {% block frosh_share_basket_list_grid_loader %}\n                    <sw-loader v-if="isLoading"></sw-loader>\n                {% endblock %}\n\n            </template>\n        {% endblock %}\n\n        {% block frosh_share_basket_list_sidebar %}\n            <sw-sidebar slot="sidebar">\n\n                {% block frosh_share_basket_list_sidebar_refresh %}\n                    <sw-sidebar-item\n                        icon="default-arrow-360-left"\n                        :title="$tc(\'frosh-share-basket.list.titleSidebarItemRefresh\')"\n                        @click="onRefresh">\n                    </sw-sidebar-item>\n                {% endblock %}\n\n                {% block frosh_share_basket_list_sidebar %}\n                <sw-sidebar-item\n                    ref="filterSideBar"\n                    icon="default-action-filter"\n                    :title="$tc(\'frosh-share-basket.list.titleSidebarItemFilter\')"\n                    @sw-sidebar-item-close-content="closeContent"\n                    @click="closeContent">\n\n                    {% block frosh_share_basket_list_sidebar_filter_sales_channel %}\n                        <sw-sidebar-collapse>\n                            <template slot="header">{{ $tc(\'frosh-share-basket.general.salesChannel\') }}</template>\n                            <template slot="content">\n\n                                {% block frosh_share_basket_list_sidebar_filter_sales_channel_items %}\n                                <div v-for="(item, index) in salesChannelFilters">\n                                    <sw-newsletter-recipient-filter-switch\n                                        :id="item.id"\n                                        group="sales_channel_id"\n                                        :label="item.translated.name"\n                                        @change="onChange">\n                                    </sw-newsletter-recipient-filter-switch>\n                                </div>\n                                {% endblock %}\n\n                            </template>\n                        </sw-sidebar-collapse>\n                    {% endblock %}\n\n                </sw-sidebar-item>\n                {% endblock %}\n\n            </sw-sidebar>\n        {% endblock %}\n\n    </sw-page>\n{% endblock %}\n'},r7uG:function(e,t,s){"use strict";s.r(t);var n=s("J7SC"),a=s.n(n);s("xlNF");const{Component:i,Mixin:r}=Shopware,{Criteria:o}=Shopware.Data;i.register("frosh-share-basket-list",{template:a.a,inject:["repositoryFactory","syncService","localeToLanguageService"],mixins:[r.getByName("listing")],data:()=>({isLoading:!1,items:null,languageId:localStorage.getItem("sw-admin-current-language"),total:0,sortBy:"saveCount",sortDirection:"DESC",filterSidebarIsOpen:!1,salesChannelFilters:[],internalFilters:{}}),metaInfo(){return{title:this.$createTitle()}},computed:{columns:()=>[{property:"productName",label:"frosh-share-basket.list.columnProductName",allowResize:!0,primary:!0},{property:"productNumber",label:"frosh-share-basket.list.columnProductNumber",allowResize:!0},{property:"saveCount",label:"frosh-share-basket.list.columnProductSaveCount",allowResize:!0},{property:"totalQuantity",label:"frosh-share-basket.list.columnProductQuantity",allowResize:!0}],salesChannelStore(){return this.repositoryFactory.create("sales_channel")}},created(){this.createdComponent()},methods:{createdComponent(){const e=new o(1,100),t=localStorage.getItem("sw-admin-locale");this.salesChannelStore.search(e,Shopware.Context.api).then(e=>{this.salesChannelFilters=e}),this.localeToLanguageService.localeToLanguage(t).then(e=>{this.languageId=e,this.getList()})},handleBooleanFilter(e){if(Array.isArray(this[e.group])||(this[e.group]=[]),!e.value)return this[e.group]=this[e.group].filter(t=>t!==e.id),void(this[e.group].length>0?this.internalFilters[e.group]=o.equalsAny(e.group,this[e.group]):delete this.internalFilters[e.group]);this[e.group].push(e.id),this.internalFilters[e.group]=o.equalsAny(e.group,this[e.group])},onChange(e){null===e&&(e=[]),this.handleBooleanFilter(e),this.getList()},closeContent(){if(this.filterSidebarIsOpen)return this.$refs.filterSideBar.closeContent(),void(this.filterSidebarIsOpen=!1);this.$refs.filterSideBar.openContent(),this.filterSidebarIsOpen=!0},getList(){this.isLoading=!0;const e=new o(this.page,this.limit,this.term);return e.languageId=this.languageId,e.addSorting(o.sort(this.sortBy,this.sortDirection)),Object.values(this.internalFilters).forEach(t=>{e.addFilter(t)}),this.syncService.httpClient.post("/frosh/sharebasket/statistics",e,{headers:this.syncService.getBasicHeaders()}).then(e=>{this.items=e.data.data,this.total=e.data.total,this.isLoading=!1}).catch(()=>{this.isLoading=!1})}}});const{Module:l}=Shopware;l.register("frosh-share-basket",{type:"plugin",name:"ShareBasket",title:"frosh-share-basket.general.mainMenuItemGeneral",description:"frosh-share-basket.general.descriptionTextModule",color:"#079FDF",icon:"default-shopping-paper-bag-product",routes:{list:{component:"frosh-share-basket-list",path:"list"}},navigation:[{label:"frosh-share-basket.general.mainMenuItemGeneral",color:"#079FDF",path:"frosh.share.basket.list",icon:"default-shopping-paper-bag-product",parent:"sw-marketing"}]})},xlNF:function(e,t,s){var n=s("ETdz");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);(0,s("SZ7m").default)("7cbd0eb8",n,!0,{})}},[["r7uG","runtime","vendors-node"]]]);