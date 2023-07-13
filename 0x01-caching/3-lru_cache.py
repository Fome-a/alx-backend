#!/usr/bin/env python3
"""
a class LRUCache that inherits from 
BaseCaching and is a caching system:
"""


from collections import deque
BaseCaching = __import__('base_caching').BaseCaching


class LRUCache(BaseCaching):
    """LRU class inherits from basecaching"""
    def __init__(self):
        """ initializer"""
        super().__init__()
        self.queue = deque()


    def put(self, key, item):
        """put to create"""
        if key and item:
            if key in self.cache_data:
                self.queue.remove(key)
            elif len(self.cache_data) >= self.MAX_ITEMS:
                popped = self.queue.popleft()
                del self.cache_data[popped]
                print("DISCARD: " + str(popped))
            self.queue.append(key)
            self.cache_data[key] = item


    def get(self, key):
        """get to etrieve """
        if key in self.cache_data:
            self.queue.remove(key)
            self.queue.append(key)
            return self.cache_data.get(key, None)
