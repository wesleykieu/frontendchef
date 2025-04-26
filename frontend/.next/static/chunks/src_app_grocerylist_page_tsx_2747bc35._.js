(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/app/grocerylist/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>GroceryListPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const meals = [
    {
        title: 'Pizza',
        ingredients: [
            'Dough',
            'Tomato Sauce',
            'Mozzarella',
            'Pepperoni',
            'Basil'
        ]
    },
    {
        title: 'Tacos',
        ingredients: [
            'Tortillas',
            'Ground Beef',
            'Lettuce',
            'Cheddar',
            'Salsa'
        ]
    },
    {
        title: 'Pasta',
        ingredients: [
            'Spaghetti',
            'Marinara Sauce',
            'Meatballs',
            'Parmesan'
        ]
    },
    {
        title: 'Salad',
        ingredients: [
            'Romaine Lettuce',
            'Cherry Tomatoes',
            'Cucumber',
            'Croutons',
            'Ranch Dressing'
        ]
    },
    {
        title: 'Stir Fry',
        ingredients: [
            'Chicken Breast',
            'Broccoli',
            'Carrots',
            'Soy Sauce',
            'Rice'
        ]
    }
];
function GroceryListPage() {
    _s();
    const [selectedIngredients, setSelectedIngredients] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [expandedMeal, setExpandedMeal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toggleIngredient = (ingredient)=>{
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(selectedIngredients.filter((item)=>item !== ingredient));
        } else {
            setSelectedIngredients([
                ...selectedIngredients,
                ingredient
            ]);
        }
    };
    const handleAddToInstacart = ()=>{
        if (selectedIngredients.length === 0) return alert('Please select some ingredients!');
        const searchQuery = selectedIngredients.map((item)=>encodeURIComponent(item)).join('%20');
        const instacartURL = `https://www.instacart.com/store/search_v3/${searchQuery}`;
        window.open(instacartURL, '_blank');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-3xl font-bold mb-6",
                children: "🛒 Grocery List"
            }, void 0, false, {
                fileName: "[project]/src/app/grocerylist/page.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            meals.map((meal)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6 p-4 bg-gray-100 rounded-lg shadow-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-semibold",
                                    children: meal.title
                                }, void 0, false, {
                                    fileName: "[project]/src/app/grocerylist/page.tsx",
                                    lineNumber: 38,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "text-blue-500 hover:underline",
                                    onClick: ()=>setExpandedMeal(expandedMeal === meal.title ? null : meal.title),
                                    children: expandedMeal === meal.title ? 'Hide Ingredients' : 'Show Ingredients'
                                }, void 0, false, {
                                    fileName: "[project]/src/app/grocerylist/page.tsx",
                                    lineNumber: 39,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/grocerylist/page.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this),
                        expandedMeal === meal.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 space-y-2",
                            children: meal.ingredients.map((ingredient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            id: ingredient,
                                            checked: selectedIngredients.includes(ingredient),
                                            onChange: ()=>toggleIngredient(ingredient),
                                            className: "mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/grocerylist/page.tsx",
                                            lineNumber: 51,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: ingredient,
                                            children: ingredient
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/grocerylist/page.tsx",
                                            lineNumber: 58,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, ingredient, true, {
                                    fileName: "[project]/src/app/grocerylist/page.tsx",
                                    lineNumber: 50,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/grocerylist/page.tsx",
                            lineNumber: 48,
                            columnNumber: 13
                        }, this)
                    ]
                }, meal.title, true, {
                    fileName: "[project]/src/app/grocerylist/page.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleAddToInstacart,
                className: "mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-xl font-semibold",
                children: "Add Selected to Instacart 🛍️"
            }, void 0, false, {
                fileName: "[project]/src/app/grocerylist/page.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/grocerylist/page.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(GroceryListPage, "S7gfry798Ck0G6QOouzg5vexkSQ=");
_c = GroceryListPage;
var _c;
__turbopack_context__.k.register(_c, "GroceryListPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_app_grocerylist_page_tsx_2747bc35._.js.map