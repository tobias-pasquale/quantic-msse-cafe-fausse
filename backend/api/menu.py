"""
Menu API Blueprint for Café Fausse
"""
from flask import Blueprint, jsonify, request
from extensions import db
from models.menu_item import MenuItem
from models.category import Category

menu_bp = Blueprint('menu', __name__)

@menu_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all menu categories"""
    categories = Category.query.all()
    return jsonify({
        'success': True,
        'categories': [category.to_dict() for category in categories]
    })

@menu_bp.route('/items', methods=['GET'])
def get_menu_items():
    """Get all menu items, optionally filtered by category"""
    category_id = request.args.get('category_id', type=int)
    
    if category_id:
        items = MenuItem.query.filter_by(category_id=category_id).all()
    else:
        items = MenuItem.query.all()
        
    return jsonify({
        'success': True,
        'items': [item.to_dict() for item in items]
    })

@menu_bp.route('/items/<int:item_id>', methods=['GET'])
def get_menu_item(item_id):
    """Get a specific menu item by ID"""
    item = MenuItem.query.get(item_id)
    
    if not item:
        return jsonify({'success': False, 'message': 'Menu item not found'}), 404
        
    return jsonify({
        'success': True,
        'item': item.to_dict()
    })

@menu_bp.route('/categories/<int:category_id>/items', methods=['GET'])
def get_items_by_category(category_id):
    """Get all menu items for a specific category"""
    category = Category.query.get(category_id)
    
    if not category:
        return jsonify({'success': False, 'message': 'Category not found'}), 404
        
    items = MenuItem.query.filter_by(category_id=category_id).all()
    
    return jsonify({
        'success': True,
        'category': category.name,
        'items': [item.to_dict() for item in items]
    })